import openai
import typer
import os

from dotenv import load_dotenv

def main():
    load_dotenv()

    api_key=os.getenv("API_KEY_AI")
    openai.api_key=api_key 

    #contexto del asistente. Rol de la IA
    messages = [{"role":"system","content":"Eres psicologo muy util recomendando ejercicios"}]
    while True:
        content =  input("¿Sobre que quieres hablar?")

    # Si el usuiario escribe esta palabra acabara la conversacion. 
        if content== "exit":
            break

        messages.append({"role":"user","content":content})

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",messages=messages)

        response_content=response.choices[0].message.content

        messages.append({"role":"assistant","content":response_content})



            # max_tokens=100,
        print(response_content)

if __name__ =="__main__":
    typer.run(main)