package com.kooshin.todoweb;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:5173") // for frontend
public class TodoController {
    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Todo> getAllTodos() {
        return service.getAllTodos();
    }

    @PostMapping
    public void addTodo(@RequestBody Todo todo) {
        service.createTodo(todo);
    }

    @PutMapping("/{id}")
    public void updateTodo(@PathVariable int id, @RequestBody Todo todo) {
        todo.setId(id);
        service.updateTodo(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable int id) {
        service.deleteTodoById(id);
    }
}
