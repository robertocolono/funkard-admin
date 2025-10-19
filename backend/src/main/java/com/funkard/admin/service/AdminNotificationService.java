package com.funkard.admin.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.funkard.admin.model.AdminNotification;
import com.funkard.admin.repository.AdminNotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;

@Service
public class AdminNotificationService {

  private final AdminNotificationRepository repo;
  private final ObjectMapper mapper = new ObjectMapper();

  public AdminNotificationService(AdminNotificationRepository repo) {
    this.repo = repo;
  }

  /**
   * Lista notifiche attive in ordine cronologico
   */
  public List<AdminNotification> listActiveChrono() {
    return repo.findByArchivedFalseOrderByCreatedAtAsc();
  }

  /**
   * Filtra notifiche per tipo, priorità e stato
   */
  public List<AdminNotification> filter(String type, String priority, String status) {
    return repo.filter(emptyToNull(type), emptyToNull(priority), emptyToNull(status));
  }

  /**
   * Ottieni notifica per ID
   */
  public Optional<AdminNotification> get(Long id) {
    return repo.findById(id);
  }

  /**
   * Risolvi notifica
   */
  @Transactional
  public AdminNotification resolve(Long id, String userName, String note) {
    AdminNotification n = repo.findById(id)
        .orElseThrow(() -> new RuntimeException("Notifica non trovata: " + id));
    
    n.setResolvedAt(Instant.now());
    n.setResolvedBy(userName);
    pushHistory(n, userName, "resolve", note);
    
    return repo.save(n);
  }

  /**
   * Archivia notifica
   */
  @Transactional
  public AdminNotification archive(Long id, String userName, String note) {
    AdminNotification n = repo.findById(id)
        .orElseThrow(() -> new RuntimeException("Notifica non trovata: " + id));
    
    n.setArchived(true);
    pushHistory(n, userName, "archive", note);
    
    return repo.save(n);
  }

  /**
   * Segna notifica come letta
   */
  @Transactional
  public AdminNotification markRead(Long id, String userName) {
    AdminNotification n = repo.findById(id)
        .orElseThrow(() -> new RuntimeException("Notifica non trovata: " + id));
    
    if (!n.isReadStatus()) {
      n.setReadStatus(true);
      n.setReadAt(Instant.now());
      pushHistory(n, userName, "read", null);
      repo.save(n);
    }
    
    return n;
  }

  /**
   * Cleanup notifiche archiviate più vecchie di N giorni
   */
  @Transactional
  public long cleanupArchivedOlderThanDays(int days) {
    Instant limit = Instant.now().minusSeconds(days * 24L * 3600L);
    return repo.deleteByArchivedTrueAndResolvedAtBefore(limit);
  }

  /**
   * Conta notifiche non lette
   */
  public long countUnread() {
    return repo.countByReadStatusFalseAndArchivedFalse();
  }

  /**
   * Lista notifiche recenti per SSE
   */
  public List<AdminNotification> getRecentNotifications() {
    return repo.findTop5ByArchivedFalseOrderByCreatedAtDesc();
  }

  /**
   * Aggiunge entry allo storico JSON
   */
  private void pushHistory(AdminNotification n, String user, String action, String note) {
    try {
      List<Map<String, Object>> history = new ArrayList<>();
      
      // Carica storico esistente
      if (n.getHistory() != null && !n.getHistory().isBlank()) {
        history = mapper.readValue(n.getHistory(), new TypeReference<>() {});
      }
      
      // Aggiungi nuova entry
      Map<String, Object> entry = new LinkedHashMap<>();
      entry.put("user", user);
      entry.put("action", action);
      entry.put("at", Instant.now().toString());
      if (note != null && !note.isBlank()) {
        entry.put("note", note);
      }
      
      history.add(entry);
      
      // Salva storico aggiornato
      n.setHistory(mapper.writeValueAsString(history));
      
    } catch (Exception e) {
      // Fallback minimale in caso di JSON malformato
      String fallbackHistory = String.format(
        "[{\"user\":\"%s\",\"action\":\"%s\",\"at\":\"%s\"}]",
        user, action, Instant.now()
      );
      n.setHistory(fallbackHistory);
    }
  }

  /**
   * Converte stringa vuota in null per query
   */
  private String emptyToNull(String v) {
    return (v == null || v.isBlank()) ? null : v;
  }
}
