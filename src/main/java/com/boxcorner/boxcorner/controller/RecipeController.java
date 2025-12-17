package com.boxcorner.boxcorner.controller;

import com.boxcorner.boxcorner.entity.Recipe;
import com.boxcorner.boxcorner.security.jwt.TokenService;
import com.boxcorner.boxcorner.entity.Colors;
import com.boxcorner.boxcorner.service.RecipeService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private TokenService tokenService;
    
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Map<String, Object> request ,HttpServletRequest httpRequest) {
        try {
            Recipe recipe = new Recipe();
            recipe.setRecipeid((String) request.get("recipeid"));
            recipe.setJobid((String) request.get("jobid"));
            recipe.setJobname((String) request.get("jobname"));
            recipe.setReqtotalweight((String) request.get("reqtotalweight"));
            recipe.setLightness((String) request.get("lightness"));
            recipe.setGreenred((String) request.get("greenred"));
            recipe.setBlueyellow((String) request.get("blueyellow"));
            
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> colorData = (List<Map<String, Object>>) request.get("colors");
            List<Colors> colors = colorData.stream().map(colorMap -> {
                Colors color = new Colors();
                color.setColorname((String) colorMap.get("color"));
                color.setWeight(String.valueOf(colorMap.get("weight")));
                color.setLot((String) colorMap.get("lot"));
                return color;
            }).toList();
            
            String currentUser = tokenService.getCurrentUser(httpRequest);
            Map<String, Object> savedRecipe = recipeService.save(recipe, colors, currentUser);
            
            return ResponseEntity.ok(savedRecipe);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAllRecipes(
            @RequestParam(required = false) String jobName, // คำค้นหา (Optional)
            @RequestParam(defaultValue = "0") int page,     // หน้าที่ต้องการ (เริ่มที่ 0)
            @RequestParam(defaultValue = "10") int size     // จำนวนต่อหน้า
    ) {
        try {
            Page<Recipe> pageRecipes = recipeService.getAllRecipes(jobName, page, size);
            return ResponseEntity.ok(pageRecipes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    

    @GetMapping("/detail")
    public ResponseEntity<?> getRecipeById(@RequestParam String recipeId) {
        try {
            Map<String, Object> recipe = recipeService.getRecipeById(recipeId);
            return ResponseEntity.ok(recipe);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
