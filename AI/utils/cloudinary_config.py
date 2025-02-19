import cloudinary 
import cloudinary.uploader
import os
from dotenv import load_dotenv
from io import BytesIO

load_dotenv() 

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_FILE_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

def upload_to_cloudinary(image_pil, folder="Preppal_AI_Generated_Images"):
    try:
        image_bytes_io = BytesIO()
        image_pil.save(image_bytes_io, format="PNG")
        image_bytes_io.seek(0)

        response = cloudinary.uploader.upload(image_bytes_io, folder=folder, resource_type="image")
        return response["secure_url"]
    except Exception as e:
        print(f"Error uploading to Cloudinary: {e}")
        return None
