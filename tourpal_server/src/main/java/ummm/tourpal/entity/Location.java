package ummm.tourpal.entity;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class Location implements Serializable {
    private String province;

    private String city;

    private String region;

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}
