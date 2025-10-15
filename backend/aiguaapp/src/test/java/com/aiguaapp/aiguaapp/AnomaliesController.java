package com.aiguaapp.aiguaapp;

import com.aiguaapp.aiguaapp.controller.AnomaliesController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AnomaliesController.class)
@TestPropertySource(properties = {
        "dataJson.path=src/test/resources/fakeDataJson"
})
class AnomaliesControllerTests {

    @Autowired
    private MockMvc mockMvc;

    private final Path anomaliesFile = Path.of("src/test/resources/fakeDataJson/anomalies.json");

    @BeforeEach
    void setup() throws IOException {
        Files.createDirectories(anomaliesFile.getParent());
        Files.writeString(anomaliesFile, "{\"test\":\"anomaliesData\"}");
    }

    @Test
    void shouldReturnAnomaliesJson() throws Exception {
        String expectedContent = Files.readString(anomaliesFile);

        mockMvc.perform(get("/anomalies/"))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedContent));
    }

    @Test
    void shouldReturnErrorIfFileNotFound() throws Exception {
        Files.deleteIfExists(anomaliesFile);

        mockMvc.perform(get("/anomalies/"))
                .andExpect(status().isOk())
                .andExpect(content().string("Error fetching data"));
    }
}