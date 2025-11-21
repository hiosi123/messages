import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => { //ExecutionContext - > works well with gRPC, websocket and http
        const request  = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)