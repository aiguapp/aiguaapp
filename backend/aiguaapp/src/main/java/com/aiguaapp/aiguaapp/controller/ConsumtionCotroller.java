package com.aiguaapp.aiguaapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;


@CrossOrigin
@RestController
@RequestMapping("/consumption")
public class ConsumtionCotroller {
	@GetMapping("/")
	public String get_consumption()
	{
        try {
            Path filePath = Path.of("src/main/resources/dataJson/consumption.json");
            String jsonString = Files.readString(filePath);
			return jsonString;
		} catch (IOException e) {
			e.printStackTrace();
			return "Error fetching data";
        }
	}

	@GetMapping("/summary")
	public String get_summary()
	{
        try {
            Path filePath = Path.of("src/main/resources/dataJson/summary.json");
            String jsonString = Files.readString(filePath);
			return jsonString;
		} catch (IOException e) {
			e.printStackTrace();
			return "Error fetching data";
        }
	}

}
