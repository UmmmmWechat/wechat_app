package ummm.tourpal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ummm.tourpal.service.SpotService;

@RestController
@RequestMapping("/spot")
public class SpotController {
    @Autowired
    private SpotService spotService;

    
}
