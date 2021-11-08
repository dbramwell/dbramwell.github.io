#!/usr/bin/env python3

from aws_cdk.core import App

from src.development_stack import DevelopmentStack

app = App()

DevelopmentStack(app, "DevelopmentStack")

app.synth()
