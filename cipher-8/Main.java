

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Scanner;

public class Main {

    static int pixelsDataStart = 54;
    static Path path = Path.of("/home/ilya-guseynov/Developer/ibpps-ciphers/cipher-8/8.bmp");
    static Path newFilePath = Path.of("/home/ilya-guseynov/Developer/ibpps-ciphers/cipher-8/img.bmp");

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println( "Введите \"ш\" чтобы зашифровать текст, или \"р\" чтобы расшифровать картинку" );
        String option = scanner.next();
        if (option.equals("ш") || option.equals("Ш")) {
            Encode();
        }
        else if (option.equals("р") || option.equals("Р")) {
            Decode();
        }
        else {
            System.out.println( "Неправильная опция" );
            return;
        }
    }

    static void Encode() {
        byte[] originalBytes;
        try {
            originalBytes = Files.readAllBytes(path);
        }
        catch(IOException e) {
            System.out.println( "Файл не найден" );
            return;
        }
        byte[] newBytes = new byte[originalBytes.length];
        System.arraycopy(originalBytes, 0, newBytes, 0, pixelsDataStart);
        System.out.println( "Введите строку для шифровки" );
        Scanner scanner = new Scanner(System.in);
        String text = scanner.next();
        byte[] textBytes;
        try {
            textBytes = text.getBytes( "Windows-1251" );
        }
        catch(UnsupportedEncodingException e) {
            System.out.println("Кодировка не поддерживается");
            return;
        }
        int bitIndex = 0;
        for (int i = pixelsDataStart; i < originalBytes.length; i++) {
            if ((textBytes[bitIndex / 8] & (0b10000000 >> (bitIndex % 8))) != 0) {
                newBytes[i] = (byte)(originalBytes[i] | 1);
            }
            else {
                newBytes[i] = (byte)(originalBytes[i] & 0b11111110);
            }
            bitIndex = (bitIndex + 1) % (textBytes.length * 8);
        }
        try {
            Files.write ( newFilePath, newBytes);
        }
        catch(IOException e) {
            System.out.println("Ошибка при записи файла");
            return;
        }
    }

    static void Decode() {
		int lengthLimit = 100;
        byte[] content;
        try {
            content = Files.readAllBytes ( newFilePath );
        }
        catch (IOException e) {
            System.out.println("Файл не найден");
            return;
        }
        byte[] textBytes = new byte[lengthLimit];
        int byteIndex = pixelsDataStart;
        for (int i = 0; i < lengthLimit; i++) {
            int bitIndex = 0;
            while (bitIndex < 8 && byteIndex < content.length) {
                textBytes[i] += (byte)((0b10000000 >> bitIndex) * (content[byteIndex] & 1));
                bitIndex++;
                byteIndex++;
            }
        }
        try {
            String str = new String(textBytes, "Windows-1251");
            System.out.println(str);
        }
        catch(UnsupportedEncodingException e) {
            System.out.println("Кодировка не поддерживается");
            return;
        }
    }
}
