package ummm.tourpal.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class Guide implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; //

    private String openId;

    private String avatar;

    private String realName;

    private String idCard;

    private char gender;

    @Embedded
    private Location location;

    private String wechat;

    private String phone;

    private String introduction;

    private int goodFeedbackRate;

    private int numOfFinishOrder;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable
    private List<Integer> favorSpots;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getWechat() {
        return wechat;
    }

    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public int getGoodFeedbackRate() {
        return goodFeedbackRate;
    }

    public void setGoodFeedbackRate(int goodFeedbackRate) {
        this.goodFeedbackRate = goodFeedbackRate;
    }

    public int getNumOfFinishOrder() {
        return numOfFinishOrder;
    }

    public void setNumOfFinishOrder(int numOfFinishOrder) {
        this.numOfFinishOrder = numOfFinishOrder;
    }

//    public Set<Integer> getFavorSpots() {
//        return favorSpots;
//    }
//
//    public void setFavorSpots(Set<Integer> favorSpots) {
//        this.favorSpots = favorSpots;
//    }

    public List<Integer> getFavorSpots() {
        return favorSpots;
    }

    public void setFavorSpots(List<Integer> favorSpots) {
        this.favorSpots = favorSpots;
    }
}
