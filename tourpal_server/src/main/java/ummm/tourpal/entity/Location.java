package ummm.tourpal.entity;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class Location implements Serializable {
    public String province;

    public String city;

//    public String region;
}
