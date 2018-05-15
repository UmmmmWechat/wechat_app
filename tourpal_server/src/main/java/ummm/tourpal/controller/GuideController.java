package ummm.tourpal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ummm.tourpal.service.GuideService;

@RestController
@RequestMapping("/guide")
public class GuideController {
    @Autowired
    private GuideService service;
}
