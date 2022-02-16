from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/location/{locationNumber}")
async def root(locationNumber):
    req = requests.get('https://www.metaweather.com/api/' + locationNumber).json()
    return {"response": req}

    #http://localhost:1711