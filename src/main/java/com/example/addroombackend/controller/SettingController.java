package com.example.addroombackend.controller;

import com.example.addroombackend.model.Setting;
import com.example.addroombackend.service.ISettingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:3000")
public class SettingController {

    private final ISettingService settingService;

    public SettingController(ISettingService settingService) {
        this.settingService = settingService;
    }

    @GetMapping
    public Setting getSetting() {
        return settingService.getSetting();
    }

    @PostMapping
    public Setting saveSetting(@RequestBody Setting setting) {
        return settingService.saveOrUpdateSetting(setting);
    }
}