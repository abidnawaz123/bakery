import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TaskUpdateConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # This method is called when a WebSocket connection is being established.
        self.room_group_name = 'task_updates'

        # Join the task update group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # This method is called when the WebSocket closes.
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    # Send message to WebSocket
    async def send_task_update(self, event):
        # Send a message to WebSocket
        await self.send(text_data=json.dumps({
            'message': event['message']
        }))
