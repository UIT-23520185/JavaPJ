package com.example.addroombackend.service;

import com.example.addroombackend.model.Setting;
import com.example.addroombackend.repository.SettingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingService implements ISettingService {

    @Autowired
    private SettingRepository settingRepository;

    @Override
    public Setting getSetting() {
        return settingRepository.findById(1L).orElse(new Setting());
    }

    @Override
    public Setting saveOrUpdateSetting(Setting setting) {
        setting.setId(1L);
        return settingRepository.save(setting);
    }
}

