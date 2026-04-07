"""
Обработка фото через DeepAI: улучшение качества и ретушь лица.
Принимает фото в base64, отправляет в DeepAI, возвращает ссылку на результат.
"""
import json
import os
import base64
import requests


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    image_b64 = body.get("image")
    mode = body.get("mode", "waifu2x")

    if not image_b64:
        return {"statusCode": 400, "headers": headers, "body": {"error": "Нет изображения"}}

    # Убираем data URL префикс если есть
    if "," in image_b64:
        image_b64 = image_b64.split(",", 1)[1]

    image_bytes = base64.b64decode(image_b64)

    api_key = os.environ["DEEPAI_API_KEY"]

    # Выбор модели DeepAI
    model_map = {
        "enhance": "waifu2x",          # Улучшение качества / апскейл
        "colorize": "colorizer",        # Колоризация
        "denoise": "torch-srgan",       # Убрать шум / зернистость
        "smooth": "waifu2x",            # Разгладить
    }
    model = model_map.get(mode, "waifu2x")

    url = f"https://api.deepai.org/api/{model}"

    response = requests.post(
        url,
        files={"image": ("photo.jpg", image_bytes, "image/jpeg")},
        headers={"api-key": api_key},
        timeout=60,
    )

    result = response.json()

    if "output_url" not in result:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": {"error": result.get("err", "Ошибка обработки")},
        }

    return {
        "statusCode": 200,
        "headers": headers,
        "body": {"result_url": result["output_url"]},
    }