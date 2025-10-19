package com.funkard.support;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.UUID;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, UUID> {
    
    List<SupportTicket> findByStatusOrderByCreatedAtDesc(TicketStatus status);
    
    @Query("SELECT t FROM SupportTicket t WHERE t.status = :status ORDER BY t.createdAt DESC")
    List<SupportTicket> findByStatus(@Param("status") TicketStatus status);
    
    @Query("SELECT t FROM SupportTicket t WHERE " +
           "(:status IS NULL OR t.status = :status) AND " +
           "(:email IS NULL OR LOWER(t.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
           "(:subject IS NULL OR LOWER(t.subject) LIKE LOWER(CONCAT('%', :subject, '%'))) " +
           "ORDER BY t.createdAt DESC")
    List<SupportTicket> findByFilters(@Param("status") TicketStatus status, 
                                   @Param("email") String email, 
                                   @Param("subject") String subject);
}
