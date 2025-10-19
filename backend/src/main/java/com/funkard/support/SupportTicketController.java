package com.funkard.support;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
public class SupportTicketController {

    private final SupportTicketService service;

    @PostMapping
    public ResponseEntity<SupportTicket> create(@RequestBody SupportTicketRequest req) {
        SupportTicket ticket = service.create(req.email(), req.subject(), req.message());
        return ResponseEntity.ok(ticket);
    }

    @GetMapping
    public List<SupportTicket> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String subject) {
        
        if (status != null) {
            TicketStatus ticketStatus = TicketStatus.valueOf(status.toUpperCase());
            return service.findByStatus(ticketStatus);
        }
        
        if (email != null || subject != null) {
            return service.findByFilters(null, email, subject);
        }
        
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportTicket> get(@PathVariable UUID id) {
        SupportTicket ticket = service.findById(id);
        return ResponseEntity.ok(ticket);
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<SupportTicket> updateStatus(
            @PathVariable UUID id, 
            @RequestBody TicketStatusRequest req) {
        
        TicketStatus status = TicketStatus.valueOf(req.status().toUpperCase());
        SupportTicket ticket = service.updateStatus(id, status, req.note());
        return ResponseEntity.ok(ticket);
    }

    @PostMapping("/{id}/note")
    public ResponseEntity<SupportTicket> addNote(
            @PathVariable UUID id, 
            @RequestBody NoteRequest req) {
        
        SupportTicket ticket = service.addNote(id, req.note());
        return ResponseEntity.ok(ticket);
    }
}

record SupportTicketRequest(String email, String subject, String message) {}
record TicketStatusRequest(String status, String note) {}
record NoteRequest(String note) {}
