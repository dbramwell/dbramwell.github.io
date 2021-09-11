#!/usr/bin/env python3

from aws_cdk.core import App

from src.development_stack import DevelopmentStack
from src.production_stack import ProductionStack


app = App()

DevelopmentStack(app, "DevelopmentStack")
ProductionStack(app, "ProductionStack")

app.synth()
