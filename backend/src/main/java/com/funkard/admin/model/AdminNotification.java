package com.funkard.admin.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "admin_notifications")
public class AdminNotification {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 32)
  private String type; // errore | segnalazione | supporto | mercato | ...

  @Column(nullable = false, length = 16)
  private String priority; // bassa | media | alta | critica

  @Column(nullable = false, length = 160)
  private String title;

  @Column(nullable = false, columnDefinition = "text")
  private String message;

  @Column(name = "read_status", nullable = false)
  private boolean readStatus = false;

  @Column(name = "read_at")
  private Instant readAt;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt = Instant.now();

  // ✅ nuovi campi
  @Column(name = "archived", nullable = false)
  private boolean archived = false;

  @Column(name = "resolved_at")
  private Instant resolvedAt;

  @Column(name = "resolved_by", length = 120)
  private String resolvedBy;

  /**
   * JSON compatto con lo storico azioni:
   * [
   *   {"user":"Admin","action":"resolve","at":"2025-10-17T12:00:00Z","note":"..."},
   *   {"user":"Admin","action":"archive","at":"2025-10-17T12:05:00Z"}
   * ]
   */
  @Column(name = "history", columnDefinition = "text")
  private String history;

  // Constructors
  public AdminNotification() {}

  public AdminNotification(String type, String priority, String title, String message) {
    this.type = type;
    this.priority = priority;
    this.title = title;
    this.message = message;
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getPriority() {
    return priority;
  }

  public void setPriority(String priority) {
    this.priority = priority;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public boolean isReadStatus() {
    return readStatus;
  }

  public void setReadStatus(boolean readStatus) {
    this.readStatus = readStatus;
  }

  public Instant getReadAt() {
    return readAt;
  }

  public void setReadAt(Instant readAt) {
    this.readAt = readAt;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }

  public boolean isArchived() {
    return archived;
  }

  public void setArchived(boolean archived) {
    this.archived = archived;
  }

  public Instant getResolvedAt() {
    return resolvedAt;
  }

  public void setResolvedAt(Instant resolvedAt) {
    this.resolvedAt = resolvedAt;
  }

  public String getResolvedBy() {
    return resolvedBy;
  }

  public void setResolvedBy(String resolvedBy) {
    this.resolvedBy = resolvedBy;
  }

  public String getHistory() {
    return history;
  }

  public void setHistory(String history) {
    this.history = history;
  }

  @Override
  public String toString() {
    return "AdminNotification{" +
        "id=" + id +
        ", type='" + type + '\'' +
        ", priority='" + priority + '\'' +
        ", title='" + title + '\'' +
        ", readStatus=" + readStatus +
        ", archived=" + archived +
        ", createdAt=" + createdAt +
        '}';
  }
}
