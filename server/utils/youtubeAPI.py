import asyncio
import os
from datetime import timedelta

import aiohttp

# -----------------------------------------------------------------------------

api_key = os.environ.get("YOUTUBE_API_KEY")
base_url = "https://www.googleapis.com/youtube/v3"

# -----------------------------------------------------------------------------


async def generatePlaylist(topics):
    async with aiohttp.ClientSession() as session:
        tasks = [search_videos(session, topic) for topic in topics]
        generated_playlist = await asyncio.gather(*tasks)
    return generated_playlist


# -----------------------------------------------------------------------------


async def search_videos(session, query):
    search_url = f"{base_url}/search"
    params = {
        "q": query,
        "type": "video",
        "part": "id,snippet",
        "maxResults": 5,
        "key": api_key,
    }
    async with session.get(search_url, params=params) as response:
        search_response = await response.json()
        video_ids = [
            item["id"]["videoId"] for item in search_response.get("items", [])
        ]
        return await get_video_details(session, video_ids)


# -----------------------------------------------------------------------------


async def get_video_details(session, video_ids):
    video_url = f"{base_url}/videos"
    params = {
        "part": "snippet,contentDetails",
        "id": ",".join(video_ids),
        "key": api_key,
    }
    async with session.get(video_url, params=params) as response:
        video_response = await response.json()
        videos = [
            {
                "title": item["snippet"]["title"],
                "author": item["snippet"]["channelTitle"],
                "thumbnail": item["snippet"]["thumbnails"]["default"]["url"],
                "description": item["snippet"]["description"],
                "video_id": item["id"],
                "duration": parse_duration(item["contentDetails"]["duration"]),
            }
            for item in video_response.get("items", [])
        ]
    return videos


# -----------------------------------------------------------------------------


def parse_duration(duration):
    num = ""
    hours, minutes, seconds = 0, 0, 0
    for c in duration[2:]:
        if c == "H":
            hours = int(num)
            num = ""
        elif c == "M":
            minutes = int(num)
            num = ""
        elif c == "S":
            seconds = int(num)
            num = ""
        else:
            num += c

    time_delta = timedelta(hours=hours, minutes=minutes, seconds=seconds)
    return str(time_delta).zfill(8)


# -----------------------------------------------------------------------------


async def main():
    topics = [
        "floyd warshall algorithm",
        "dijkstra algorithm",
    ]
    print("Number of topics:", len(topics))

    playlist = await generatePlaylist(topics)

    print("Number of topics with videos:", len(playlist))
    print("Number of videos per topic:", [len(videos) for videos in playlist])

    dard = [[x["title"] for x in rat] for rat in playlist]
    print(dard)

    output_file_path = os.path.join(os.getcwd(), "output.txt")
    with open(output_file_path, "w", encoding="utf-8") as file:
        for videos in playlist:
            for video in videos:
                file.write(str(video) + "\n")


# -----------------------------------------------------------------------------

if __name__ == "__main__":
    asyncio.run(main())
