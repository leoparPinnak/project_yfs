import instaloader
import os
import shutil

L = instaloader.Instaloader(
    download_videos=False, 
    download_video_thumbnails=False,
    download_geotags=False,
    download_comments=False,
    save_metadata=False,
    compress_json=False
)

profile_name = "mimarisanatt"
target_dir = os.path.join("public", profile_name)

try:
    profile = instaloader.Profile.from_username(L.context, profile_name)
    count = 0
    for post in profile.get_posts():
        L.download_post(post, target=target_dir)
        count += 1
        if count >= 12: 
            break
except Exception as e:
    print(f"Error: {e}")

# clean up any non image files
if os.path.exists(target_dir):
    for f in os.listdir(target_dir):
        if not f.endswith('.jpg') and not f.endswith('.png'):
            os.remove(os.path.join(target_dir, f))
