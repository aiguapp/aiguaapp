package com.aiguaapp.aiguaapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
public class AnomaliesController {
    @GetMapping("/")
	public String home()
	{
		return "Helloworld\n";
	}

	@GetMapping("/anomalies")
	public String get_anomalies()
	{
        try {
            Path filePath = Path.of("src/main/resources/dataJson/anomalies.json");
            String jsonString = Files.readString(filePath);
			return jsonString;
		} catch (IOException e) {
			e.printStackTrace();
			return e.getMessage();
        }
	}
}
