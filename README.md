# EmotionBot 
Emotionbot, kullanıcıların duygu durumlarına göre web 
sitesinin tasarımını ve önerilen çalma listesini otomatik olarak 
değiştiren bir web uygulamasıdır. HTML, CSS, JavaScript ile 
oluşturulan ön yüz ve Python, Flask tabanlı arkayüz kullanılmıştır. 
Kullanıcılar, sohbet kutusuna mesaj yazarak duygularını ifade eder. 
Chatbot (textblob kütüphanesi) mesajları analiz ederek 'mutlu', 'üzgün' veya
'nötr' olarak sınıflandırır. Mutlu ruh hali için sarı renk, üzgün ruh hali için 
mavi renk, nötr ruh hali için gri renk ağırlıklı arka plan fotoğrafları kullanılmıştır. 
Her bir duygu için ise beş farklı arka plan fotoğrafı mevcuttur. Önceki Fotoğraf
ve Sonraki Fotoğraf butonları ile fotoğraflar arasında geçiş yapılabilir.
Spotify API’si ile entegre olan uygulama, her duygu durumuna uygun çalma listeleri
önerir ve arka plan rengini değiştirir. Emotionbot, kişiselleştirilmiş müzik ve 
görsellerle kullanıcı deneyimini zenginleştirir, duygusal rahatlama ve 
moral desteği sağlar.

(Projedeki EMOTIONBOT yazısında ve açıklama yazısında animasyon kullanıldı,
hover efektleri ile önceki fotoğraf,sonraki fotoğraf butonları oluşturuldu)


## Özellikler
- Kullanıcı mesajlarından duygu analizi yapar ("Happy", "Sad", "Neutral").
- Spotify playlist'lerini gömülü bir iframe aracılığıyla önerir.
- Minimal ve dinamik bir ön yüz tasarımı içerir.

## Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın:
   ```bash
   git clone https://github.com/kullaniciadi/emotionbot.git
   cd emotionbot
   ```

### 2. Gerekli Bağımlılıkları Yükleyin:
   ```bash
   pip install -r requirements.txt
   ```

### 3. Flask Sunucusunu Başlatın:
   ```bash
   python app.py
   ```

### 4. Uygulamayı Açın:
Tarayıcıdan [http://127.0.0.1:5000](http://127.0.0.1:5000) adresine gidin.

## Kullanılan Teknolojiler

- **Backend**: Flask, TextBlob, Spotify API
- **Frontend**: HTML, CSS, JavaScript

## Proje Yapısı

```
emotionbot/
│
├── app.py                  # Flask uygulaması
├── index.html              # HTML dosyası (ön yüz)
├── images/                 # Gerekli resimler için bir klasör
├── sunum/                  # Readme (sunum) için oluşturulmuş dosyadır
├── requirements.txt        # Python bağımlılıkları
└── README.md               # Proje hakkında bilgi
```

## Lisans
Bu proje MIT lisansı altında sunulmaktadır.

---
## Sunum
![Fotoğraf 1](sunum/1.png)
![Fotoğraf 2](sunum/2.png)
![Fotoğraf 3](sunum/3.png)
![Fotoğraf 4](sunum/4.png)
![Fotoğraf 5](sunum/5.png)
![Fotoğraf 6](sunum/6.png)
![Fotoğraf 7](sunum/h1.png)
![Fotoğraf 8](sunum/h2.png)
![Fotoğraf 9](sunum/h3.png)
![Fotoğraf 10](sunum/h4.png)
![Fotoğraf 11](sunum/h5.png)
![Fotoğraf 12](sunum/n1.png)
![Fotoğraf 13](sunum/n2.png)
![Fotoğraf 14](sunum/n3.png)
![Fotoğraf 15](sunum/n4.png)
![Fotoğraf 16](sunum/n5.png)
![Fotoğraf 17](sunum/s1.png)
![Fotoğraf 18](sunum/s2.png)
![Fotoğraf 19](sunum/s3.png)
![Fotoğraf 20](sunum/s4.png)
![Fotoğraf 21](sunum/s5.png)




