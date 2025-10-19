package com.funkard.support;

import com.funkard.admin.notifications.AdminNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SupportTicketService {

    private final SupportTicketRepository repo;
    private final AdminNotificationService notifications;

    @Transactional
    public SupportTicket create(String email, String subject, String message) {
        SupportTicket ticket = new SupportTicket();
        ticket.setEmail(email);
        ticket.setSubject(subject);
        ticket.setMessage(message);
        ticket.setStatus(TicketStatus.NEW);
        ticket.setCreatedAt(OffsetDateTime.now());
        
        SupportTicket savedTicket = repo.save(ticket);

        // Crea notifica admin
        notifications.createAdminNotification(
            "Nuovo ticket di supporto",
            subject,
            "high",
            "support_ticket"
        );

        return savedTicket;
    }

    public List<SupportTicket> findAll() {
        return repo.findAll();
    }

    public List<SupportTicket> findByStatus(TicketStatus status) {
        return repo.findByStatusOrderByCreatedAtDesc(status);
    }

    public List<SupportTicket> findByFilters(TicketStatus status, String email, String subject) {
        return repo.findByFilters(status, email, subject);
    }

    public SupportTicket findById(UUID id) {
        return repo.findById(id).orElseThrow(() -> 
            new RuntimeException("Ticket non trovato: " + id));
    }

    @Transactional
    public SupportTicket updateStatus(UUID id, TicketStatus status, String note) {
        SupportTicket ticket = findById(id);
        ticket.setStatus(status);
        ticket.setAdminNote(note);
        ticket.setUpdatedAt(OffsetDateTime.now());
        
        if (status == TicketStatus.RESOLVED) {
            ticket.setResolvedAt(OffsetDateTime.now());
        }
        
        return repo.save(ticket);
    }

    @Transactional
    public SupportTicket addNote(UUID id, String note) {
        SupportTicket ticket = findById(id);
        String existingNote = ticket.getAdminNote();
        String updatedNote = existingNote != null ? 
            existingNote + "\n" + note : note;
        ticket.setAdminNote(updatedNote);
        ticket.setUpdatedAt(OffsetDateTime.now());
        
        return repo.save(ticket);
    }
}
