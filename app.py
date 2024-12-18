import random
import requests
from flask import Flask, request, jsonify, send_from_directory,render_template
from textblob import TextBlob
import base64

app = Flask(__name__)

# Spotify API Bilgileri
SPOTIFY_CLIENT_ID = 'Spotify uygulamanızın Client IDsini girin' #spotify uygulamanızın Client IDsini girin
SPOTIFY_CLIENT_SECRET = 'Spotify uygulamanızın Client Secret ini girin' #spotify uygulamanızın Client Secret'ini girin
SPOTIFY_PLAYLISTS = {
    'Happy': '37i9dQZF1DX5H8QSpChffy',  # mutlu şarkılar playlistinin ID'si 
    'Sad': '37i9dQZF1DWXLdhiQTrZDp',  # üzgün şarkılar playlistinin ID'si 
    'Neutral': '37i9dQZF1DWVHdYf9Bwcjq'  # nötr şarkılar playlistinin ID'si
}

def get_spotify_token():
    url = 'https://accounts.spotify.com/api/token'
    headers = {
        'Authorization': f'Basic {SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}'
    }
    data = {
        'grant_type': 'client_credentials'
    }
    response = requests.post(url, headers=headers, data=data)
    return response.json().get('access_token')  
    

def get_playlist_embed_url(playlist_id):
    return f'https://open.spotify.com/embed/playlist/{playlist_id}?utm_source=generator&theme=0'

'''@app.route('/')
def home():
    return send_from_directory('static', 'index.html')'''

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # 'index.html' dosyasını templates klasöründen yükler


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify(error="Invalid input"), 400

    user_message = data['message']
    sentiment = analyze_sentiment(user_message)
    recommendation, color = get_recommendation(sentiment)
    

    playlist_id = SPOTIFY_PLAYLISTS[recommendation]
    playlist_url = get_playlist_embed_url(playlist_id)

    return jsonify(reply=f"{recommendation} Playlist:", color=color, playlist_url=playlist_url)


def analyze_sentiment(text): 
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0.1:
        return 'Happy'
    elif analysis.sentiment.polarity < -0.1:
        return 'Sad'
    else:
        return 'Neutral'

def get_recommendation(sentiment):
    if sentiment =='Happy':
        return 'Happy', '#FFEB3B'  # Sarı
    elif sentiment =='Sad':
        return 'Sad', '#2196F3'  # Mavi
    else:
        return 'Neutral', '#9E9E9E'  # Gri

@app.route('/static/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('static/images', filename)

if __name__ == '__main__':
    app.run(debug=True)





