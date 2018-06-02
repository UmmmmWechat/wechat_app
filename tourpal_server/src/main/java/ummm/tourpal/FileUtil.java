package ummm.tourpal;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import ummm.tourpal.entity.Test_Spot;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class FileUtil {
    public static void main(String[] args) throws IOException {
        File file = new File("spots.json");

        FileInputStream inputStream = new FileInputStream(file);
        byte[] content = new byte[inputStream.available()];

        inputStream.read(content);
        inputStream.close();

        String json = new String(content, "UTF-8");

        List<Test_Spot> list = new Gson().fromJson(json, new TypeToken<List<Test_Spot>>() {
        }.getType());

        json = new Gson().toJson(list);

        System.out.println(json);

        FileOutputStream outputStream = new FileOutputStream(file);

        outputStream.write(json.getBytes());
    }
}
