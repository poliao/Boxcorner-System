package com.boxcorner.boxcorner.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.boxcorner.boxcorner.entity.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, String> {
    
    @Query("SELECT r.recipeid FROM Recipe r WHERE r.recipeid LIKE 'BCA%' ORDER BY r.recipeid DESC LIMIT 1")
    String findTopByOrderByRecipeidDesc();

    Page<Recipe> findByJobnameContainingIgnoreCase(String jobName, Pageable pageable);

}

