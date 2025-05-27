package com.example.addroombackend.service;

import com.example.addroombackend.model.Setting;

public interface ISettingService {
    Setting getSetting();
    Setting saveOrUpdateSetting(Setting setting);
}
