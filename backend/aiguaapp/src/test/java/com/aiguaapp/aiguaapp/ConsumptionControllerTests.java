package com.aiguaapp.aiguaapp;

import com.aiguaapp.aiguaapp.controller.ConsumtionCotroller;
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

@WebMvcTest(ConsumtionCotroller.class)
@TestPropertySource(properties = {
        "dataJson.path=src/test/resources/fakeDataJson"
})
class ConsumptionControllerTests {

    @Autowired
    private MockMvc mockMvc;

    private final Path consumptionFile = Path.of("src/test/resources/fakeDataJson/consumption.json");
    private final Path summaryFile = Path.of("src/test/resources/fakeDataJson/summary.json");

    @BeforeEach
    void setup() throws IOException {
        Files.createDirectories(consumptionFile.getParent());
        Files.writeString(consumptionFile, "{\"test\":\"consumptionData\"}");
        Files.writeString(summaryFile, "{\"test\":\"summaryData\"}");
    }

    @Test
    void shouldReturnConsumptionJson() throws Exception {
        String expectedContent = Files.readString(consumptionFile);

        mockMvc.perform(get("/consumption/"))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedContent));
    }

    @Test
    void shouldReturnSummaryJson() throws Exception {
        String expectedContent = Files.readString(summaryFile);

        mockMvc.perform(get("/consumption/summary"))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedContent));
    }

    @Test
    void shouldReturnErrorIfFileNotFound() throws Exception {
        Files.deleteIfExists(consumptionFile);

        mockMvc.perform(get("/consumption/"))
                .andExpect(status().isOk())
                .andExpect(content().string("Error fetching data"));
    }
}