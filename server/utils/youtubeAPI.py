import os
import googleapiclient.discovery
from datetime import timedelta

api_key = 'AIzaSyCE4xdm_bjBWqtIV7aD4CdRnzoX4wFDHxk'
youtube = googleapiclient.discovery.build(
    'youtube', 'v3', developerKey=api_key)


def getPlaylist(topics):
    video_ids = []
    video_data = []
    for topic in topics:
        video_ids.append(search_video(topic))
    for video_id in video_ids:
        video_data.append(get_video_details(video_id))
    return video_data


def search_video(query):
    search_response = youtube.search().list(
        q=query,
        type='video',
        part='id,snippet',
        maxResults=5
    ).execute()

    video_id = search_response['items'][0]['id']['videoId'] if 'items' in search_response else None
    return video_id


def get_video_details(video_id):
    video_response = youtube.videos().list(
        part='snippet,contentDetails',
        id=video_id
    ).execute()

    items = video_response.get('items', [])

    if items:
        video_details = {
            'title': items[0]['snippet']['title'],
            'author': items[0]['snippet']['channelTitle'],
            'description': items[0]['snippet']['description'],
            'video_id': video_id,
            'duration': items[0]['contentDetails']['duration'],
        }

        num = ''
        hours, minutes, seconds = 0, 0, 0
        for c in video_details['duration'][2:]:
            if c == 'H':
                hours = int(num)
                num = ''
            elif c == 'M':
                minutes = int(num)
                num = ''
            elif c == 'S':
                seconds = int(num)
                num = ''
            else:
                num += c

        time_delta = timedelta(hours=hours, minutes=minutes, seconds=seconds)
        video_details['duration'] = str(time_delta).zfill(8)
        return video_details
    else:
        return None


if __name__ == '__main__':
    current_directory = os.path.dirname(os.path.realpath(__file__))
    output_file_path = os.path.join(current_directory, "output.txt")

    topics = ["floyd warshall algorithm", "dijkstra algorithm",]
    #   "bellman ford algorithm", "kruskal algorithm", "prim algorithm",
    #   "union find algorithm", "topological sort", "strongly connected components", "minimum spanning tree", "shortest path",
    #   "longest path", "maximum flow", "minimum cut", "maximum bipartite matching", "minimum vertex cover", "maximum independent set",
    #   "minimum dominating set", "minimum edge dominating set", "minimum feedback vertex set", "minimum feedback edge set",
    #   "minimum spanning tree", "minimum spanning forest", "minimum cut", "minimum cut tree", "minimum cut forest",
    #   "minimum vertex cover", "minimum edge cover", "minimum dominating set", "minimum edge dominating set",
    #   "minimum feedback vertex set", "minimum feedback edge set", "maximum independent set", "maximum matching",
    #   "maximum bipartite matching", "maximum flow", "maximum cut", "maximum clique", "maximum stable set", "maximum vertex cover",
    #   "maximum edge cover", "maximum independent dominating set", "maximum independent edge dominating set", "maximum feedback vertex set",
    #   "maximum feedback edge set", "maximum matching", "maximum bipartite matching", "maximum flow", "maximum cut", "maximum clique",
    #   "maximum stable set", "maximum vertex cover", "maximum edge cover", "maximum independent dominating set",
    #   "maximum independent edge dominating set", "maximum feedback vertex set", "maximum feedback edge set"]
    # print(len(topics))

    playlist = getPlaylist(topics)

    with open(output_file_path, "w", encoding="utf-8") as file:
        for video in playlist:
            file.write(str(video) + '\n')
