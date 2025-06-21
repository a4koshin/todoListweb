package com.kooshin.todoweb;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TodoService {
    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    // Get all
    public List<Todo> getAllTodos() {
        return repo.findAll();
    }

    // Create
    public void createTodo(Todo todo) {
        repo.save(todo);
    }

    // Update
    public void updateTodo(Todo updatedTodo) {
        Todo existingTodo = repo.findById(updatedTodo.getId())
            .orElseThrow(() -> new RuntimeException("Todo not found with ID: " + updatedTodo.getId()));

        existingTodo.setTitle(updatedTodo.getTitle());
        existingTodo.setCompleted(updatedTodo.getCompleted());

        repo.save(existingTodo);
    }

    // Delete
    public void deleteTodoById(int id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Todo not found with ID: " + id);
        }
        repo.deleteById(id);
    }
}
