//package ummm.tourpal.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import ummm.tourpal.entity.*;
//import ummm.tourpal.service.GuideService;
//import ummm.tourpal.service.SpotService;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.List;
//
//@RestController
//@RequestMapping("/guide")
//public class GuideController {
//    @Autowired
//    private GuideService guideService;
//
//    @Autowired
//    private SpotService spotService;
//
//    @RequestMapping("/queryIfNew")
//    public boolean queryIfNew(String code) {
//        return guideService.queryIfNew(code);
//    }
//
//    @PostMapping("/signUp")
//    public int signUp(@RequestBody GuidePre guidePre) {
//        return guideService.signUp(guidePre);
//    }
//
//    @RequestMapping("/login")
//    public Guide login(String code) {
//        return guideService.login(code);
//    }
//
//    @PostMapping("/modifyGuideInfo")
//    public ResultMessage modifyGuideInfo(@RequestBody GuideModify guideModify) {
//        return guideService.modifyGuideInfo(guideModify);
//    }
//
//    @RequestMapping("/acceptOrder")
//    public ResultMessage acceptOrder(int orderId) {
//        return guideService.acceptOrder(orderId);
//    }
//
//    @RequestMapping("/rejectOrder")
//    public ResultMessage rejectOrder(int orderId) {
//        return guideService.rejectOrder(orderId);
//    }
//
//    @RequestMapping("/queryOrders")
//    public List<Order> queryOrders(int guideId, State state, int lastIndex) {
//        return guideService.queryOrders(guideId, state, lastIndex);
//    }
//
//    @RequestMapping("/queryOrdersByKeyword")
//    public List<Order> queryOrdersByKeyword(int guideId, String keyword, int lastIndex) {
//        return guideService.queryOrdersByKeyword(guideId, keyword, lastIndex);
//    }
//
//    @RequestMapping("/querySpots")
//    public List<Spot> querySpots(@RequestBody Location location, int lastIndex) {
//        return spotService.querySpots(location, lastIndex);
//    }
//
//    @RequestMapping("/querySpotsByKeyword")
//    public List<Spot> querySpotsByKeyword(String keyword, int lastIndex) {
//        return spotService.querySpotsByKeyword(keyword, lastIndex);
//    }
//}
