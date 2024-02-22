import tmi from './tmi.js';

import commands from './commands/index.js';
import { hasMinLevel } from './helpers.js';

const callbacks = [];

commands.forEach(command => {
  command.init();

  callbacks.push({
    name: command.name,    
    permission: command.permission,
    type: command.type,
    callback: command.callback,
  });
});

const broadcasterCommands = commands.filter(command => command.permission === 'broadcaster');
const moderatorCommands = commands.filter(command => command.permission === 'moderator');
const vipCommands = commands.filter(command => command.permission === 'vip');
const subscriberCommands = commands.filter(command => command.permission === 'subscriber');
const everyoneCommands = commands.filter(command => command.permission === 'everyone');

const client = new tmi.Client({
  options: { 
    debug: false, 
  },
  channels: [
    'aaoa_'
  ],
});

client.connect()
  .catch(console.error);

client.on('connected', (address, port) => {
  console.log(`Connected to ${address}:${port}`);
});

client.on('message', (channel, tags, message, self) => {
  if (self) return;
  
  if(hasMinLevel(tags, 'broadcaster')) {
    broadcasterCommands.forEach(command => {
      command.callback(channel, tags, message);
    });
  }
  if(hasMinLevel(tags, 'moderator')) {
    moderatorCommands.forEach(command => {
      command.callback(channel, tags, message);
    });
  }
  if(hasMinLevel(tags, 'vip')) {
    vipCommands.forEach(command => {
      command.callback(channel, tags, message);
    });
  }
  if(hasMinLevel(tags, 'subscriber')) {
    subscriberCommands.forEach(command => {
      command.callback(channel, tags, message);
    });
  }
  everyoneCommands.forEach(command => {
    command.callback(channel, tags, message);
  });
});
