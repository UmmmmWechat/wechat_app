package ummm.tourpal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ummm.tourpal.entity.*;
import ummm.tourpal.service.SpotService;
import ummm.tourpal.service.TouristService;

import java.util.List;

@RestController
@RequestMapping("/tourist")
public class TouristController {
    @Autowired
    private TouristService touristService;

    @Autowired
    private SpotService spotService;

    @RequestMapping("/login")
    public int login(String code) {
        return touristService.login(code);
    }

    @RequestMapping("/queryById")
    public Tourist queryById(int id) {
        return touristService.queryById(id);
    }

    @RequestMapping("/queryGuideBySpot")
    public List<Guide> queryGuideBySpot(int spotId, int lastIndex) {
        return touristService.queryGuideBySpot(spotId, lastIndex);
    }

    @RequestMapping("/queryGuideByKeyword")
    public List<Guide> queryGuideByKeyword(String keyword, int lastIndex) {
        return touristService.queryGuideByKeyword(keyword, lastIndex);
    }

    @RequestMapping("/inviteGuide")
    public int inviteGuide(@RequestBody OrderPre orderPre) {
        return touristService.inviteGuide(orderPre);
    }

    @RequestMapping("/queryOrders")
    public List<Order> queryOrders(int touristId, State state, int lastIndex) {
        return touristService.queryOrders(touristId, state, lastIndex);
    }

    @RequestMapping("/queryOrdersByKeyword")
    public List<Order> queryOrdersByKeyword(int touristId, String keyword, int lastIndex) {
        return touristService.queryOrdersByKeyword(touristId, keyword, lastIndex);
    }

    @RequestMapping("/cancelOrder")
    public ResultMessage cancelOrder(int orderId, String cancelMessage) {
        return touristService.cancelOrder(orderId, cancelMessage);
    }

    @RequestMapping("/commendOrder")
    public ResultMessage commendOrder(int orderId, @RequestBody Feedback feedback) {
        return touristService.commendOrder(orderId, feedback);
    }

    @RequestMapping("/querySpots")
    public List<Spot> querySpots(@RequestBody Location location, int lastIndex) {
        return spotService.querySpots(location, lastIndex);
    }

    @RequestMapping("/querySpotsByKeyword")
    public List<Spot> querySpotsByKeyword(String keyword, int lastIndex) {
        return spotService.querySpotsByKeyword(keyword, lastIndex);
    }
}
