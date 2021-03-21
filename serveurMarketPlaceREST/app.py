from flask import Flask
from flask import jsonify
from flask import request
from zeep import Client
from flask_cors import CORS

import graphene
import json

urlSOAP = "https://serveursoap.azurewebsites.net/?wsdl"

# Creation de l'instance
app = Flask(__name__)
CORS(app)


class Produit(graphene.ObjectType):
    nom = graphene.String()
    prix = graphene.String()
    poids = graphene.String()


class Query(graphene.ObjectType):
    produit = graphene.List(Produit)

    def resolve_produit(self, info):
        return[
            Produit(nom="Machine à laver", prix="150", poids="3"),
            Produit(nom="Four micro-onde", prix="100", poids="1"),
        ]


@app.route("/", methods=['GET'])
def test():
    return "coucou"


@app.route("/soap/<prix>/<poids>/<distance>", methods=['GET'])
def getPrixLivraison(prix, poids, distance):
    client = Client(urlSOAP)
    liv = client.service.livraison(poids, distance)
    prixTotal = int(prix) + int(liv)
    print(liv)
    res = [prixTotal]
    return str(res)


@app.route("/verification/<code>", methods=['GET'])
def luhn(code):
    c = [int(x) for x in code[::-2]]
    u2 = [(2*int(y))//10+(2*int(y)) % 10 for y in code[-2::-2]]
    return sum(c+u2) % 10 == 0


@app.route("/produit", methods=['GET'])
def getProduits():
    schema = graphene.Schema(query=Query)
    query_produit = '{ produit{nom prix poids} }'
    res = schema.execute(query_produit)
    items = dict(res.data.items())
    print(items)
    return json.dumps(items, indent=4)


if(__name__ == "__main__"):
    app.run()
