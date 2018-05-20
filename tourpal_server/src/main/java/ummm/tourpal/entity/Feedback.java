package ummm.tourpal.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int spotPoint;

    private int guidePoint;

    private String comment;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSpotPoint() {
        return spotPoint;
    }

    public void setSpotPoint(int spotPoint) {
        this.spotPoint = spotPoint;
    }

    public int getGuidePoint() {
        return guidePoint;
    }

    public void setGuidePoint(int guidePoint) {
        this.guidePoint = guidePoint;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
