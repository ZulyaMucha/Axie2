import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Main,
  AxieSpawned,
  AxieEvolved,
  Transfer
} from "../generated/Main/Main"
import { Axie, TransferEntity, User } from "../generated/schema"

export function handleAxieSpawned(event: AxieSpawned): void {
 
  let lovelyAxie = Axie.load(event.params._axieId.toHex())
  if (lovelyAxie == null) {
    lovelyAxie = new Axie(event.params._axieId.toHex())
  }
  lovelyAxie.name = event.params._axieId
  lovelyAxie.genes = event.params._genes
  let contract = Main.bind(event.address)

  let user = User.load(event.params._owner.toHex())
  if (user == null) {
    user = new User(event.params._owner.toHex())
  }
  user.address = event.params._owner
  user.quantityAxies = contract.balanceOf(event.params._owner)
  user.save()

  lovelyAxie.creator = event.params._owner.toHex()
  lovelyAxie.birthTime = event.block.timestamp
  lovelyAxie.save()
}
    
export function handleAxieEvolved(event: AxieEvolved): void {
  let lovelyAxie = Axie.load(event.params._axieId.toHex())
  if (lovelyAxie == null) {
    lovelyAxie = new Axie(event.params._axieId.toHex())
  }
  lovelyAxie.genes = event.params._newGenes
  lovelyAxie.evolvingTime = event.block.timestamp
  lovelyAxie.save()
}

export function handleTransfer(event: Transfer): void {
  let transer = new TransferEntity (event.transaction.hash.toHex())
  transer.blockNumber = event.block.number
  transer.timestamp = event.block.timestamp
  transer.AxieNumber = event.params._tokenId
  transer.src = event.params._from
  transer.dst = event.params._to
  transer.save()
}
