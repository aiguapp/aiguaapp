package com.aiguaapp.aiguaapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Value;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@CrossOrigin
@RestController
@RequestMapping("/anomalies")
public class AnomaliesController {

    @Value("${dataJson.path:src/main/resources/dataJson}")
    private String dataJsonPath;

    @GetMapping("/")
    public String get_anomalies() {
        try {
            Path filePath = Path.of(dataJsonPath, "anomalies.json");
            return Files.readString(filePath);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error fetching data";
        }
    }
}