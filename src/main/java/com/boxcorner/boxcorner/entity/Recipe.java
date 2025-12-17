package com.boxcorner.boxcorner.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "recipe")
@Data
public class Recipe {

    @Id
    private String recipeid;
    private String jobid;
    private String jobname;
    private String updatedate;
    private String updateby;
    private Integer reqtotalweight;
    private Integer lightness;
    private Integer greenred;
    private Integer blueyellow;
}
