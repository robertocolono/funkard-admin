package com.funkard.admin.controller;

import com.funkard.admin.model.AdminNotification;
import com.funkard.admin.service.AdminNotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/admin/notifications")
public class AdminNotificationsController {

  private final AdminNotificationService service;

  public AdminNotificationsController(AdminNotificationService service) {
    this.service = service;
  }

  /**
   * Lista notifiche con filtri opzionali
   * GET /api/admin/notifications?type=&priority=&status=
   */
  @GetMapping
  public List<AdminNotification> list(@RequestParam(required = false) String type,
                                      @RequestParam(required = false) String priority,
                                      @RequestParam(required = false) String status) {
    if (type != null || priority != null || status != null) {
      return service.filter(type, priority, status);
    }
    return service.listActiveChrono();
  }

  /**
   * Dettaglio notifica
   * GET /api/admin/notifications/{id}
   */
  @GetMapping("/{id}")
  public ResponseEntity<AdminNotification> get(@PathVariable Long id) {
    return service.get(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  /**
   * Segna notifica come letta
   * POST /api/admin/notifications/{id}/read
   */
  @PostMapping("/{id}/read")
  public ResponseEntity<AdminNotification> markRead(@PathVariable Long id, Principal principal) {
    String user = principal != null ? principal.getName() : "admin";
    try {
      AdminNotification notification = service.markRead(id, user);
      return ResponseEntity.ok(notification);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  /**
   * Risolvi notifica
   * POST /api/admin/notifications/{id}/resolve
   */
  @PostMapping("/{id}/resolve")
  public ResponseEntity<AdminNotification> resolve(@PathVariable Long id,
                                                   @RequestBody(required = false) NoteReq body,
                                                   Principal principal) {
    String user = principal != null ? principal.getName() : "admin";
    String note = body != null ? body.note : null;
    
    try {
      AdminNotification notification = service.resolve(id, user, note);
      return ResponseEntity.ok(notification);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  /**
   * Archivia notifica
   * POST /api/admin/notifications/{id}/archive
   */
  @PostMapping("/{id}/archive")
  public ResponseEntity<AdminNotification> archive(@PathVariable Long id,
                                                   @RequestBody(required = false) NoteReq body,
                                                   Principal principal) {
    String user = principal != null ? principal.getName() : "admin";
    String note = body != null ? body.note : null;
    
    try {
      AdminNotification notification = service.archive(id, user, note);
      return ResponseEntity.ok(notification);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  /**
   * Cleanup notifiche archiviate
   * DELETE /api/admin/notifications/cleanup?days=30
   */
  @DeleteMapping("/cleanup")
  public ResponseEntity<CleanupRes> cleanup(@RequestParam(defaultValue = "30") int days) {
    long deleted = service.cleanupArchivedOlderThanDays(days);
    return ResponseEntity.ok(new CleanupRes(deleted, days));
  }

  /**
   * Conta notifiche non lette
   * GET /api/admin/notifications/unreadCount
   */
  @GetMapping("/unreadCount")
  public ResponseEntity<UnreadCountRes> unreadCount() {
    long count = service.countUnread();
    return ResponseEntity.ok(new UnreadCountRes(count));
  }

  /**
   * Notifiche recenti per SSE
   * GET /api/admin/notifications/recent
   */
  @GetMapping("/recent")
  public List<AdminNotification> recent() {
    return service.getRecentNotifications();
  }

  // DTO Records
  public record NoteReq(String note) {}
  public record CleanupRes(long deleted, int olderThanDays) {}
  public record UnreadCountRes(long unreadCount) {}
}
