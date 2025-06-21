package com.kooshin.todoweb;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "task")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    private Boolean completed = false;

    private LocalDateTime createdAt = LocalDateTime.now();
}
