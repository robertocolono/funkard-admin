package com.funkard.admin.repository;

import com.funkard.admin.model.AdminNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface AdminNotificationRepository extends JpaRepository<AdminNotification, Long> {

  /**
   * Lista notifiche attive in ordine cronologico (dalla più vecchia)
   */
  List<AdminNotification> findByArchivedFalseOrderByCreatedAtAsc();

  /**
   * Filtra notifiche per tipo, priorità e stato
   * @param type tipo notifica (errore, segnalazione, supporto, mercato, ...)
   * @param priority priorità (bassa, media, alta, critica)
   * @param status stato (attiva, risolta, archiviata)
   * @return lista filtrata
   */
  @Query("""
    select n from AdminNotification n
    where (:type is null or n.type = :type)
      and (:priority is null or n.priority = :priority)
      and (:status is null
           or (:status = 'attiva' and n.archived = false)
           or (:status = 'archiviata' and n.archived = true)
           or (:status = 'risolta' and n.resolvedAt is not null))
    order by n.createdAt asc
  """)
  List<AdminNotification> filter(@Param("type") String type, 
                                 @Param("priority") String priority, 
                                 @Param("status") String status);

  /**
   * Elimina notifiche archiviate più vecchie di un certo periodo
   * @param olderThan data limite
   * @return numero di notifiche eliminate
   */
  long deleteByArchivedTrueAndResolvedAtBefore(Instant olderThan);

  /**
   * Conta notifiche non lette
   */
  long countByReadStatusFalseAndArchivedFalse();

  /**
   * Lista notifiche per priorità (per SSE stream)
   */
  List<AdminNotification> findByArchivedFalseAndPriorityOrderByCreatedAtDesc(String priority);

  /**
   * Lista notifiche recenti (ultime N)
   */
  List<AdminNotification> findTop5ByArchivedFalseOrderByCreatedAtDesc();
}
