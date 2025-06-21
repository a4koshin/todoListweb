package com.kooshin.todoweb;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo ,Integer> {

}
