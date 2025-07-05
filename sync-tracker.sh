#!/bin/bash

echo "Starte rsync Tracker_fg_V2 zum Server pilot-tracker"

rsync -avz --delete \
	--exclude=node_modules \
	--exclude=.git \
	--exclude='.gitattributes' \
	--exclude='.nodemon.json' \
	--exclude='package-lock.json' \
~/Documents/VS_Code/Projects/Tracker_fg_V2/ \
frankie@217.154.84.3:/home/frankie/pilot-tracker/

echo "Übertragung beendet"

