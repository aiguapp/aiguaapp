package com.aiguaapp.aiguaapp.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@CrossOrigin
@RestController
@RequestMapping("/consumption")
public class ConsumtionCotroller {

    @Value("${dataJson.path:src/main/resources/dataJson}")
    private String dataJsonPath;

    @GetMapping("/")
    public String get_consumption() {
        try {
            Path filePath = Path.of(dataJsonPath, "consumption.json");
            return Files.readString(filePath);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error fetching data";
        }
    }

    @GetMapping("/summary")
    public String get_summary() {
        try {
            Path filePath = Path.of(dataJsonPath, "summary.json");
            return Files.readString(filePath);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error fetching data";
        }
    }
}