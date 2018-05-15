package ummm.tourpal.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "spot")
public class Spot implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Embedded
    private Location location;

    private String pictureUrl;

    private String introduction;

    private int recommendLevel;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public int getRecommendLevel() {
        return recommendLevel;
    }

    public void setRecommendLevel(int recommendLevel) {
        this.recommendLevel = recommendLevel;
    }
}
