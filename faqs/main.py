# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class FAQ(BaseModel):
    question: str
    answer: str

faqs = [
    {"id": 1, "question": "What is an apple?", "answer": "A fruit."},
    {"id": 2, "question": "What is a banana?", "answer": "A fruit."}
]

@app.get("/faqs", response_model=List[FAQ])
def read_faqs():
    return faqs

@app.get("/faqs/{id}", response_model=FAQ)
def read_faq(id: int):
    faq = next((faq for faq in faqs if faq['id'] == id), None)
    if faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faq

@app.post("/faqs", response_model=FAQ)
def create_faq(faq: FAQ):
    new_faq = faq.dict()
    new_faq['id'] = len(faqs) + 1
    faqs.append(new_faq)
    return new_faq

@app.put("/faqs/{id}", response_model=FAQ)
def update_faq(id: int, faq: FAQ):
    existing_faq = next((f for f in faqs if f['id'] == id), None)
    if existing_faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    updated_faq = faq.dict()
    updated_faq['id'] = id
    faqs[faqs.index(existing_faq)] = updated_faq
    return updated_faq

@app.delete("/faqs/{id}")
def delete_faq(id: int):
    global faqs
    faqs = [faq for faq in faqs if faq['id'] != id]
    return {"ok": True}
