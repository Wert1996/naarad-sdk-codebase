# Naarad sdk
This repository completes code for Naarad SDK's backend lambdas, kotlin SDK and website. This is meant for review by the hackathon judges. For the Naarad Kotlin SDK library, refer to this repo: https://github.com/Wert1996/Naarad-kotlin-sdk.
This repository contains the following three code bases.

Website Link: https://d3bhwtjk5vuhv4.cloudfront.net/

## Naarad backend lambdas

A collection of lambdas constituting the backend of Naarad SDK.

#### Chain Event Listener

This lambda is invoked by an sqs queue, which ingests push notification events. These events can be blockchain triggered events, or events sent using the chain Event API.
This lambda handles the events, and sends a notification depending on a number of parameters.

#### Device Registration Lambda

This lambda is composed of the device registration API. This is used by the Kotlin SDK, and it helps maintain device - account states.

#### Dapp CRUD Lambda

This lambda handles CRUD operations on dApps. For now, it supports POST and GET operations on dApps.

#### Register New Accounts Lambda

This lambda runs every 1 minute based on an event bridge rule. It receives messages from an sqs queue, which contains list of all new accounts that are to be added to Naarad. Blockchain activities for these accounts will then be listened to by Naarad.

#### Naarad Common

This is a lambda layer that contains many helper classes and utilities, used by all the above lambdas.

## Naarad Kotlin SDK

This is the Kotlin module for using Naarad on android devices.

## Naarad UI

The UI built on React, html and CSS for the Naarad website.
