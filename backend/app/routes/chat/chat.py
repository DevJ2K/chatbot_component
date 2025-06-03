from fastapi import APIRouter

router = APIRouter()

@router.get('/hello', name="The default route")
async def hello():
    return {"hello": "world"}
